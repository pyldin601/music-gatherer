import axios from "axios";
import { stringify } from "querystring";
import { TextDecoder } from "util";
import convert from "html-to-json-data";
import { group, text, data } from "html-to-json-data/definitions";

const cp1251Decoder = new TextDecoder("cp1251");

const LAST_FM_APP_API_KEY = "9b076e07316d3171d9cbdacb8cf77c61";
const LAST_FM_USER = "TedIrens";

const LAST_FM_LIMIT = 200;

const RUTRACKER_LOGIN = "Ted Irens";
const RUTRACKER_PASSWORD = "";

async function main() {
  const albums = new Set<string>();

  async function loginToRutracker(): Promise<string> {
    const postData = stringify({
      login_username: RUTRACKER_LOGIN,
      login_password: RUTRACKER_PASSWORD,
      login: "Вход",
    });

    const response = await axios.post(
      "https://rutracker.org/forum/login.php",
      postData,
      {
        maxRedirects: 0,
        validateStatus: (statusCode) => statusCode === 302,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": postData.length,
        },
      }
    );

    const cookies: ReadonlyArray<string> = Array.isArray(
      response.headers["set-cookie"]
    )
      ? response.headers["set-cookie"]
      : [];

    const cookie = cookies.find((cookie) => cookie.startsWith("bb_session"));

    if (!cookie) {
      throw new Error("Unable to login to rutracker.org!");
    }

    return cookie;
  }

  console.log("Login to rutracker.org");
  const cookie = await loginToRutracker();

  async function fetchPage(page: number): Promise<void> {
    console.log("Fetch page", page);

    const response = await axios.get<{
      readonly recenttracks: {
        readonly "@attr": {
          readonly page: string;
          readonly total: string;
          readonly user: string;
          readonly perPage: string;
          readonly totalPages: string;
        };
        readonly track: ReadonlyArray<{
          readonly artist: {
            readonly mbid: string;
            readonly "#text": string;
          };
          readonly album: {
            readonly mbid: string;
            readonly "#text": string;
          };
          readonly image: ReadonlyArray<{
            readonly size: string;
            readonly "#text": string;
          }>;
          readonly date: {
            readonly uts: string;
            readonly "#text": string;
          };
        }>;
      };
    }>(`http://ws.audioscrobbler.com/2.0/`, {
      params: {
        limit: LAST_FM_LIMIT,
        page,
        method: "user.getrecenttracks",
        user: LAST_FM_USER,
        api_key: LAST_FM_APP_API_KEY,
        format: "json",
      },
    });

    for (const track of response.data.recenttracks.track) {
      const album = `${track.artist["#text"]} - ${track.album["#text"]} MP3`;
      if (albums.has(album)) return;

      console.log("Searching album", album);
      albums.add(album);

      const response = await axios.get(
        "https://rutracker.org/forum/tracker.php",
        {
          params: {
            nm: "Alan Davey",
          },
          headers: {
            Cookie: cookie,
          },
          responseType: "arraybuffer",
        }
      );

      const body = cp1251Decoder.decode(response.data);
      const struct = convert(body, {
        results: group("#tor-tbl tr .t-title", {
          id: data("a.tLink", "topic_id"),
          title: text("a.tLink"),
        }),
      });

      console.log("here", struct);
      process.exit();
    }

    if (page < +response.data.recenttracks["@attr"].totalPages) {
      await fetchPage(page + 1);
    }
  }

  await fetchPage(1);
}

main();

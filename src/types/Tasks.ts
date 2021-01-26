import * as t from 'io-ts'

const GetRecentScrobbles = t.type({
  type: t.literal('GET_RECENT_SCROBBLES'),
  input: t.type({
    offset: t.number,
  }),
  output: t.type({
    scrobbles: t.array(t.type({
      artist: t.string,
      album: t.string,
      title: t.string,
      date: t.string,
    }))
  })
})

const LoginToRutrackerOrg = t.type({
  type: t.literal('LOGIN_TO_RUTRACKER_ORG'),
  input: t.type({
    login: t.string,
    password: t.string
  }),
  output: t.type({
    bb_session: t.string,
  })
})


const SearchAtRutrackerOrg = t.type({
  type: t.literal('SEARCH_AT_RUTRACKER_ORG'),
  input: t.type({
    artist: t.string,
    album: t.string,
    keywords: t.array(t.string)
  }),
  output: t.type({
    entries: t.array(t.type({
      name: t.string,
      id: t.string
    }))
  })
})

const DownloadTorrentFileFromRutrackerOrg = t.type({
  type: t.literal('DOWNLOAD_TORRENT_FILE_FROM_RUTRACKER_ORG'),
  input: t.type({
    id: t.string
  }),
  output: t.type({
    file: t.string,
    content: t.array(t.string)
  })
})

const DownloadTorrent = t.type({
  type: t.literal('DOWNLOAD_TORRENT'),
  input: t.type({
    file: t.string,
    path: t.string
  }),
  output: t.type({
  })
})

const UploadToMusicloud = t.type({
  type: t.literal('UPLOAD_TO_MUSICLOUD'),
  input: t.type({
    files: t.array(t.string)
  }),
  output: t.type({
    ids: t.array(t.string)
  })
})

export const Tasks = t.union([
  GetRecentScrobbles,
  LoginToRutrackerOrg,
  SearchAtRutrackerOrg,
  DownloadTorrentFileFromRutrackerOrg,
  DownloadTorrent,
  UploadToMusicloud
])

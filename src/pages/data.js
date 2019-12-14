const columns = [
  {
    title: "音乐名称",
    dataIndex: "title"
  },
  {
    title: "音乐语言",
    dataIndex: "language"
  },
  {
    title: "歌手名称",
    dataIndex: "author"
  },
  {
    title: "专辑名称",
    dataIndex: "album_title"
  },
  {
    title: "音乐描述",
    dataIndex: "info"
  },
  {
    title: "公司信息",
    dataIndex: "si_proxycompany"
  },
  {
    title: "歌曲图片",
    dataIndex: "pic_small",
    render: v => <img src={v} alt="" />
  }
];

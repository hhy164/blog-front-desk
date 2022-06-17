import Mock from "mockjs";
import qs from "querystring";

Mock.mock("/api/message", "post", {
  code: 0,
  msg: "",
  data: {
    id: "@guid",
    nickname: "@cname",
    content: "@cparagraph(1, 10)",
    createDate: Date.now(),
    "avatar|1": [
      "https://img0.baidu.com/it/u=65281725,2853112785&fm=253&fmt=auto&app=138&f=PNG?w=509&h=500",
      "https://img0.baidu.com/it/u=1429851867,3157547688&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200",
      "https://img1.baidu.com/it/u=4216761644,15569246&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
      "https://img0.baidu.com/it/u=2314600222,1003014148&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    ],
  },
});

Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", function (options) {
  const query = qs.parse(options.url);

  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      total: 52,
      [`rows|${query.limit || 10}`]: [
        {
          id: "@guid",
          nickname: "@cname",
          content: "@cparagraph(1, 10)",
          createDate: Date.now(),
          "avatar|1": [
            "https://img0.baidu.com/it/u=65281725,2853112785&fm=253&fmt=auto&app=138&f=PNG?w=509&h=500",
            "https://img0.baidu.com/it/u=1429851867,3157547688&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200",
            "https://img1.baidu.com/it/u=4216761644,15569246&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
            "https://img0.baidu.com/it/u=2314600222,1003014148&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          ],
        },
      ],
    },
  });
});

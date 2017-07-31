# dg-hotpot official website

<p align="center">
  <a href="https://travis-ci.org/xJkit/dg-hotpot-website">
    <img alt="Travis Status" src="https://img.shields.io/travis/xJkit/dg-hotpot-website/master.svg?label=travis&maxAge=43200" />
  </a>
</p>

Cloudflare: MSN 帳號
網址： 中華電信 domain 每年 10 月登入

部署到 GitHub Page 幾個步驟：

1. 在個人 id 下新增一個專案名為 `<id>.github.io`
2. production 模式必須透過 `subtree` 將 `dist` 推到 *gh-page* 或 *master*:
  ```sh
  git subtree -P dist push origin master
  ```
3. 新增 `CNAME`. 在 npm script 中的 `prebuild` 跟 `postbuild` 加入以下 hook:
  ```json
    "prebuild": "rimraf dist",
    "build": "webpack --config webpack.config.prod.js",
    "postbuild": "echo 'dg-hotpot.com.tw' >> dist/CNAME"
  ```
4. 在專案 `Settings` 中自訂網域名稱並改為 `dg-hotpot.com.tw` (apex domain)
5. DNS 代管中心更改指向
  * 使用 CloudFlare:
    * 將 DNS Server 兩台直接交由 Cloudflare 代管，這裡就沒你的事了
      * matt.ns.cloudflare.com
      * nicole.ns.cloudflare.com
    * 在 Cloudflare 設定中新增兩個 A 紀錄，並指向 GitHub 專案的 ip 位址：
      * 192.30.252.153
      * 192.30.252.154
6. 等待奇蹟的發生

優化前：

```sh
         Asset     Size  Chunks                    Chunk Names
      style.js  2.52 kB       6  [emitted]         style
       main.js   356 kB       0  [emitted]  [big]  main
      index.js  2.53 kB       2  [emitted]         index
    contact.js  2.52 kB       3  [emitted]         contact
  affiliate.js  2.52 kB       4  [emitted]         affiliate
      about.js  2.52 kB       5  [emitted]         about
       menu.js  2.52 kB       1  [emitted]         menu
    index.html  1.98 MB       2  [emitted]  [big]  index
    about.html   538 kB       5  [emitted]  [big]  about
     menu.html  1.58 MB       1  [emitted]  [big]  menu
affiliate.html   591 kB       4  [emitted]  [big]  affiliate
  contact.html   552 kB       3  [emitted]  [big]  contact
     style.css  66.3 kB    0, 6  [emitted]         main, style
```

優化後：

```sh
         Asset       Size  Chunks                    Chunk Names
      style.js  489 bytes       6  [emitted]         style
       main.js     129 kB       0  [emitted]         main      index.js  488 bytes       2  [emitted]         index
    contact.js  489 bytes       3  [emitted]         contact
  affiliate.js  489 bytes       4  [emitted]         affiliate
      about.js  489 bytes       5  [emitted]         about
       menu.js  489 bytes       1  [emitted]         menu
    index.html    1.98 MB       2  [emitted]  [big]  index
    about.html     538 kB       5  [emitted]  [big]  about
     menu.html    1.58 MB       1  [emitted]  [big]  menu
affiliate.html     591 kB       4  [emitted]  [big]  affiliate
  contact.html     552 kB       3  [emitted]  [big]  contact
     style.css    63.9 kB    0, 6  [emitted]         main, style
```
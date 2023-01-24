import axios from "axios";

export const getCredo = async (query) => {
  try {
    const url = "https://gsacademy.jp/about/";
    const html = (await axios.get(url)).data;
    const minimizedHtml = html.replaceAll(/\n|\r|\t/g, "")

    // 指定するテキストを取得
    const textJa = minimizedHtml
      // 正規表現で指定する文字列を取得
      .match(/(?<=<h4 class="system-credo__list-item-title">)[\s\S]+?(?=<\/h4>)/g)
      // 正規表現で文字列の中身を整理
      .map(x => x.trim().replaceAll(/['　', '<br>']/g, ''));
    
    // imgタグのsrcを取得する
    const imgUrl = minimizedHtml
      .match(/\/assets\/images\/item\/credo_0[1234567]\.png/g)
      .map(x => `https://gsacademy.jp${x}`);

    const credoJson = [...Array(7)].map((x, i) => ({
      credo_no: i + 1,
      text_ja: textJa[i],
      img_url: imgUrl[i]
    }))
    return credoJson;
  } catch (e) {
    throw Error("Error while getting HTML.");
  }
};

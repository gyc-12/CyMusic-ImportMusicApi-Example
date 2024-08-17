// example2.js
//如果api地址是ip+端口形式，ios17+可能请求失败
const KW_URL = ''
//getMusicUrl 函数用于获取音乐 URL。必须接受以下四个参数：songname: 歌曲名称，artist: 艺术家名称，songid: 企鹅平台的歌曲songmid，quality: 音质 '128k'|'320k'|'flac'。
async function getMusicUrl(songname,artist,songid,quality){
  try{
  const  id =await getKwId(songname,artist)
  const  url = await getUrlFromKw(id,quality)
  //直接返回歌曲url。请勿返回其他信息
  return url
  }catch(e){
  // 如果获取失败，返回null
    return null
  }
}
//可以通过搜索接口获取其他平台的songid
async function getKwId(songname,artist) {
  const encodedSongInfo = encodeURIComponent(songname+' '+artist);
  const searchUrl = `https://search.kuwo.cn/r.s?client=kt&all=${encodedSongInfo}&pn=0&rn=25&uid=794762570&ver=kwplayer_ar_9.2.2.1&vipver=1&show_copyright_off=1&newver=1&ft=music&cluster=0&strategy=2012&encoding=utf8&rformat=json&vermerge=1&mobi=1&issubtitle=1`;

  try {
    // Make a request to the search URL
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract the DC_TARGETID from the first item in abslist
    if (data.abslist && data.abslist.length > 0) {
      const dcTargetId = data.abslist[0].DC_TARGETID;
      return dcTargetId;
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function getUrlFromKw(kwId, quality) {
  // Construct the source URL using the provided kwId and quality
  switch (quality){
    case 'flac':
      quality = '2000k'+quality
      break;
    case '128k':
      quality =quality+'mp3'
      break;
    case '320k':
      quality =quality+'mp3'
      break;
    default:
      quality = '128kmp3'
  }
  const sourceUrl = `${KW_URL}${kwId}&br=${quality}`;

  try {
    // Make a request to the source URL
    const response = await fetch(sourceUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseText = await response.text();

    // 提取获取到的url
    const urlMatch = responseText.match(/url=(https?:\/\/\S+)/);
    // Trim any extra whitespace or newlines
    if (urlMatch && urlMatch[1]) {
      const url = urlMatch[1].trim(); 
      return url;
    } else {
      throw new Error('URL not found in response');
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}
module.exports = {
// 音源唯一编号
id: "example2",
// 作者
author: "author2",
// 音源显示的名称
name: "示例音源2",
//版本
version: "0.0.1",
//更新地址
srcUrl: "",
//getMusicUrl方法必须导出
getMusicUrl
   
};
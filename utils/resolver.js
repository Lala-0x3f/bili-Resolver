const Parse = (input) => {
    // 定义正则表达式模式，匹配"AV..."或"BV..."格式的编号
    const pattern = /(?:av([a-zA-Z0-9]+)|bv([a-zA-Z0-9]{7,}))/i;

    // 在输入字符串中搜索匹配的模式
    const match = input.match(pattern);

    // 如果找到匹配项，则返回匹配到的编号数据
    if (match) {
        console.table({'输入':input,'匹配':match[0]})
        return match[0]; // 将匹配到的内容转换为小写
    } else {
        return null; // 如果未找到匹配项，则返回空
    }

    
}

async function getRedirectResult(url) {
    try {
      const response = await fetch(url, { redirect: 'follow' });
  
      // 确保请求成功
      if (!response.ok) {
        throw new Error('网络请求失败');
      }
  
      // 获取最终重定向地址
      const finalUrl = response.url;
  
      return finalUrl;
    } catch (error) {
      console.error('获取重定向结果失败:', error);
      return null;
    }
  }

async function checkRedirect(url) {
    // try {
    //     const response = await fetch(url, { redirect: 'manual' });
    //     console.warn(response.headers.get('Location'))
    //     const finalUrl = response.headers.get('Location');
    //     return finalUrl;
    // } catch (error) {
    //     console.error('Error:', error);
    //     return null;
    // }
    return url
}

async function fetchBVInfo(bvid) {
    // 构建API请求URL
    const apiUrl = `https://api.pearktrue.cn/api/bilibili/info.php?bvid=${bvid}`;

    try {
        // 发起API请求
        const response = await fetch(apiUrl);

        // 检查是否成功获取数据
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // 解析JSON数据
        const data = await response.json();

        // 返回"data"字段中的结果
        return data.data;
    } catch (error) {
        console.error('Error fetching Bilibili info:', error);
        return null;
    }
}


const resolver = async (i) => {
    let n = await Parse(i)
    if(n == null){
        return null
    }
    let fullVideoUrl = `https://jx.91vrchat.com/bl/?url=https://www.bilibili.com/video/${n}/`
    fullVideoUrl = await checkRedirect(fullVideoUrl)

    //https://jx.91vrchat.com/bl/?url=https://www.bilibili.com/video/bv1rx4y1w7yj/
    //https://jx.91vrchat.com/bl/?url=https://www.bilibili.com/video/BV1Dm4y1w7f4/
    const data = await fetchBVInfo(n)
    if (data) {
        data.url = fullVideoUrl
        data.bilibili = `https://www.bilibili.com/video/${n}/`
        data.bid = n
        return data
    } else {
        console.error('Fetch error: Data is undefined')
        return null
    }
}


export {resolver}
- base64.js  

> base64加密解密

```
var str = "网址：http://www.sina.com.cn";
document.write("原始字符串:</br>"+str);
var base64 = BASE64.encoder(str);//返回编码后的字符 
document.write("</br>BASE64后:</br>"+base64);
//alert(base64);
var unicode= BASE64.decoder(base64);//返回会解码后的字符串。  
document.write("</br>还原:</br>"+unicode);
```


- des3.js 

> des3加密和解密

```
var str = "网址：http://www.sina.com.cn";
var key = "qXSdHWfbSZaaLeHBRhLgxBiG";
var des3en = DES3.encrypt(key,str);
document.write("</br>des3加密:</br>"+des3en);
document.write("</br>des3解密:</br>"+DES3.decrypt(key,des3en));
```
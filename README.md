# beselected

帮您在网页上快速设定一个划词触发类应用。

用法:

给要触发选中即popup出来小应用的段落或是div等容器加上gotapi_share 这个class:

```
<div class="gotapi_share">
	选中这里的一段文字，即可看效果
</div>
``

```javascript
import beselected from 'beselected'
    let se = (beselected())
    se.init({
        mainHandler:()=>{
            return "testing <a href='#'>gogogo</a> 往/console/keys查看您所有的secret。 创建多个secret 您可以创建多个secret,每个secret用于不同的场景"
        }
})
``` 


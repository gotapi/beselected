# beselected

帮您在网页上快速设定一个划词触发类应用。

用法:

```javascript
import beselected from 'beselected'
    let se = (beselected())
    se.init({
        mainHandler:()=>{
            return "testing <a href='#'>gogogo</a> 往/console/keys查看您所有的secret。 创建多个secret 您可以创建多个secret,每个secret用于不同的场景"
        }
})
``` 

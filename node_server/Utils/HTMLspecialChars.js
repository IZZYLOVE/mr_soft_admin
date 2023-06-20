module.exports = (obj) => {
  console.log('obj b4') 
  console.log(obj) 
  let typt;
  function convert(str)
  {
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");

    // str = str.replace(/}/g, "&quot;");
    // str = str.replace(/{/g, "&#039;");
    // str = str.replace(/\(/g, "&quot;");
    // str = str.replace(/)/g, "&#039;");
    // str = str.replace(/\[/g, "&quot;");
    // str = str.replace(/]/g, "&#039;");
    // str = str.replace(/?/g, "&#039;");
    // str = str.replace(/^/g, "&#039;");
    // str = str.replace(/:/g, "&#039;");
    // str = str.replace(/;/g, "&#039;");
    // str = str.replace(/~/g, "&#039;");
    // str = str.replace(/`/g, "&#039;");
    // str = str.replace(/%/g, "&#039;");
    return str;
  }

  for (props in obj) {
    console.log('before')
    console.log('type')
    type = typeof(obj[props])
    console.log(props+': '+obj[props]) 
    console.log(type)

    if(type === 'string'){ 
      obj[props] = `${convert(obj[props])}`
    }
    else{
      obj[props] = `${obj[props]}`
    }

  }
  return (obj)
}
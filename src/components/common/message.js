const message =  function(content,time=1.5,type="warning"){
  switch(type){
    case "warning":
      this.$Message.warning({
        content:content,
        duration:time,
        closable:true,
      });
      break;
    case "info":
      this.$Message.info({
        content:content,
        duration:time,
        closable:true,
      });
      break;
    case "error":
      this.$Message.error({
        content:content,
        duration:time,
        closable:true,
      });
    break;
    case "success":
      this.$Message.success({
        content:content,
        duration:time,
        closable:true,
      });
    break;
  } 
}
export default message;
export function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  return dd + "/" + mm + "/" + yyyy;
}
export var SERVER_URL = "http://188.166.49.57:8080"; //localhost or 188.166.49.57

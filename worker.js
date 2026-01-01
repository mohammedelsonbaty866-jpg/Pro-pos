
export default {
  fetch(req, env) {
    return new Response(JSON.stringify({active:true}), {headers:{'Content-Type':'application/json'}})
  }
}

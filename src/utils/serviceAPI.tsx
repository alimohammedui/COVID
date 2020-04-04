// only for GET methods
export /**
 * name
 */
function serviceExecutor(url: string, callback: CallableFunction) {
  fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      callback(resp);
    });
}

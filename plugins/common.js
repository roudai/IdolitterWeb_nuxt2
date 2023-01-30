const errorDialog = (buefy, message) => {
  buefy.notification.open({
    message,
    type: 'is-danger',
    position: 'is-top',
    pauseOnHover: true,
  })
}

export default ({ _app }, inject) => {
  inject('errorDialog', errorDialog)
}

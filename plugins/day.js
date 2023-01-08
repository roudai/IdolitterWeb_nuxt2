import dayjs from 'dayjs'

import 'dayjs/locale/ja'
// eslint-disable-next-line import/no-named-as-default-member
dayjs.locale('ja')

export default ({ _app }, inject) => {
  inject('dayjs', (string) => dayjs(string))
}

import { mount } from '@vue/test-utils'
import home from '@/views/Home.vue'

describe('home.vue', () => {
  it('renders tab 1 view', () => {
    const wrapper = mount(home)
    expect(wrapper.text()).toMatch('Tab 1 page')
  })
})

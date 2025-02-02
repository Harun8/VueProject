import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Form from '@/components/Form.vue'

describe('Form.vue', () => {
  it('emits "submit-task" when not editing', async () => {
    const wrapper = mount(Form, {
      props: {
        isEdit: false
      }
    })
    
    // set form fields
    await wrapper.find('input[placeholder="Title"]').setValue('New Task')
    await wrapper.find('input[placeholder="Body"]').setValue('Task body')
    
    await wrapper.find('button').trigger('click')

    // check event payload
    expect(wrapper.emitted('submit-task')).toHaveLength(1)
    const eventPayload = wrapper.emitted('submit-task')?.[0]?.[0]
    expect(eventPayload).toEqual({ title: 'New Task', body: 'Task body' })
  })
})

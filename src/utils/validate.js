export function validateContact(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (values.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Enter a phone number with at least 10 digits.'
  }
  if (values.message.trim().length < 8) errors.message = 'Please write a short message.'
  return errors
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0
}

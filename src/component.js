import money from './directive'
import defaults from './options'
import {format, unformat} from './utils'

export default {
  name: 'Money',
  props: {
    value: {
      required: true,
      type: [Number, String],
      default: 0
    },
    masked: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      default: () => defaults.precision
    },
    decimal: {
      type: String,
      default: () => defaults.decimal
    },
    thousands: {
      type: String,
      default: () => defaults.thousands
    },
    prefix: {
      type: String,
      default: () => defaults.prefix
    },
    suffix: {
      type: String,
      default: () => defaults.suffix
    }
  },

  directives: {money},

  data () {
    return {
      formattedValue: ''
    }
  },

  watch: {
    value: {
      immediate: true,
      handler (newValue) {
        var formatted = format(newValue, this.$props)
        if (formatted !== this.formattedValue) {
          this.formattedValue = formatted
        }
      }
    }
  },

  methods: {
    change (evt) {
      this.$emit('input', this.masked ? evt.target.value : unformat(evt.target.value, this.precision))
    }
  },

  render (h) {
    return h('input', {
      directives: [{
        name: 'v-money',
        value: {
          precision: this.precision,
          decimal: this.decimal,
          thousands: this.thousands,
          prefix: this.prefix,
          suffix: this.suffix
        }
      }],
      attrs: {
        type: 'tel',
        ...this.$attrs
      },
      class: 'v-money',
      props: {
        value: this.formattedValue
      },
      on: {
        ...this.$listeners,
        change: this.change
      }
    })
  }
}

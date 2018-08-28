class Rhy {
  constructor(config, rhys = []) {
    this.rhys = rhys || []
    this.config = config || {}
  }

  listen(done) {
    const target = this.config.target || window
    const tickKeys = this.config.tickKeys || [',', '.']
    const keyEnd = this.config.keyEnd || 'q'
    const startTime = + new Date()
    // add listen
    const event = target.addEventListener('keydown', onTick.bind(this))
    console.log(`start listen tick on key ${JSON.stringify(tickKeys)}, stop with ${keyEnd}`)

    this.rhys = []

    function onTick(event) {
      if (tickKeys.indexOf(event.key) !== -1) {
        this.rhys.push(+ new Date() - startTime)
      } else if (event.key === keyEnd) {
        // remove listen
        target.removeEventListener('keydown', onTick)
        if (typeof done === 'function') done(this.rhys)
      }
    }
  }

  echo(callback) {
    const tick = callback
    this.rhys.forEach(rhy => {
      setTimeout(() => {
        tick(rhy)
      }, rhy);
    })
  }
}


const rhy = new Rhy({}, [752, 958, 1173, 1581, 1984, 2176, 2367, 2557, 2725, 2914, 3111])
rhy.echo((time) => {
  console.log('tick ' + time)
})

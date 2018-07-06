require('./reload.component.less')

function controller() {
    this.$onInit = () => {
        console.log(this)
    }
}

export default {
    controller,
    bindings: {
        changeMode: '<'
    },
    template: require('./reload.component.html')
};

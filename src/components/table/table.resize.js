import {$} from '@core/dom';

export function resizeHandler($root, event) {
    const $resizer = $(event.target)
    // const $parent = $resizer.$el.parentNode BAD!
    // const $parent = $resizer.$el.closest('.column') BETTER BUT BAD
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoors()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    })

    console.log(type);

    console.log($parent.data.col)
    console.log($parent.getCoors())

    document.onmousemove = e => {
        console.log(e.pageX)
        if (type === 'col') {
            const delta = e.pageX - coords.right
            value = coords.width + delta
            $resizer.css({
                right: -delta + 'px'
            })

        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta
            $resizer.css({
                bottom: -delta + 'px'
            })

        }

    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col') {
            $parent.css({
                width: value + 'px'
            })
            this.$root.findAll(`[data-col="${$parent.data.col}"`)
                .forEach(el => {
                    el.style.width = value + 'px'
                })
        } else {
            $parent.css({
                height: value + 'px'
            })
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
    }
}

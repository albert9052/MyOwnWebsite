var contextSwitcher
var contextSwitcherLock = false
var timer

function contextSwitcherHandlerStopper() {
	if (!contextSwitcherLock) {
		let children = contextSwitcher.children()
		for (let i = 0; i < children.length; i++) {
			obj = children.eq(i)
			if (obj.offset().top - obj.parent().offset().top >= -10 && obj.offset().top - obj.parent().offset().top <= 10) {
				clearTimeout(timer)
				return
			}
		}
		if (timer !== null) {
			clearTimeout(timer)
		}
		timer = setTimeout(async () => {
			let children = contextSwitcher.children()
			for (let i = 0; i < children.length; i++) {
				if (children.eq(i).offset().top - contextSwitcher.offset().top >= 20) {
					contextSwitcherLock = true
					await scrollTo(children.eq(i))
					let children1 = contextSwitcher.children()
					for (let i = 0; i < children1.length; i++) {
						obj = children1.eq(i)
					}
					contextSwitcherLock = false
					break
				}
			}
		}, 250)
	}
}

async function scrollTo(obj) {
	await obj.parent().animate({
		scrollTop: obj.offset().top - obj.parent().children().eq(0).offset().top
	}, 300);
}

$(document).ready(() => {
	contextSwitcher = $("#contextSwitcher")
	$("#contextSwitcher").on("scroll", contextSwitcherHandlerStopper)
	//scrollTo(contextSwitcher.children().eq(2))
})

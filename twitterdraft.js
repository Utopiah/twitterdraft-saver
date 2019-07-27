var previousDrafts = {}
var twitterDraft = localStorage.getItem('twitterDraft')
if (twitterDraft) previousDrafts = JSON.parse( twitterDraft )

var textEl = document.querySelector('.public-DraftEditor-content [data-text=true]')
var toolbarEl = document.querySelector('[data-testid=toolBar]').parentElement
Object.keys(previousDrafts).forEach( (item) => {
	var draft = document.createElement('li')
	draft.setAttribute("draft-hash", item)
	var draftText = document.createElement('span')
	var date = new Date( Number(item) ).toISOString()
	draftText.textContent = date + ' : ' + previousDrafts[item]
	//draftText.addEventListener("click", updateDraftEditor)
	draft.appendChild(draftText)
	var draftCloseBtn = document.createElement('span')
	draftCloseBtn.textContent = ' [X]'
	draftCloseBtn.addEventListener("click", draftClose)
	draft.appendChild(draftCloseBtn)
	toolbarEl.appendChild(draft)
})

function draftClose(){
	delete previousDrafts[this.parentElement.getAttribute("draft-hash")]
	this.parentElement.style.display = "none"
	localStorage.setItem('twitterDraft', JSON.stringify(previousDrafts) )
}

/*
Unfortunately too unreliable
function updateDraftEditor(){
	if (textEl.tagName == 'BR') {
		var parentEl = textEl.parentElement
		var properTextEl = document.createElement('span')
		textEl.removeAttribute('data-text')
		properTextEl.setAttribute('data-text', 'true')
		parentEl.appendChild(properTextEl)
		textEl = properTextEl
	}
	textEl.innerHTML = previousDrafts[this.parentElement.getAttribute("draft-hash")]
	console.log( previousDrafts[this.parentElement.getAttribute("draft-hash")] )
	console.log( textEl.innerHTML )
}
*/

window.onbeforeunload = function (e) {
	var textEl = document.querySelector('.public-DraftEditor-content [data-text=true]')
	if (textEl && textEl.innerHTML) {
		previousDrafts[Date.now()] = textEl.innerHTML
		localStorage.setItem('twitterDraft', JSON.stringify(previousDrafts) )
	}
}

function Cipher(input, shift, encrypted){
	this.input = input;
	this.shift = shift;
	this.encrypted = encrypted
	this.code = this.shift.charCodeAt(this.shift.length-1)-65
	this.encrypt = function(){
		var msg = "";
		for (var i = 0; i < this.input.length; i++) {
  		var oldLetter = this.input.charAt(i)
  		var newLetter = switchLetter(oldLetter, this.code, this.encrypted)
  		msg += (newLetter)
		}
		this.showNewMsg(msg)
	}
	this.showNewMsg = function(msg){
		var myNode = document.getElementById("new-msg-field");
		while (myNode.firstChild) {
		    myNode.removeChild(myNode.firstChild);
		}
		var newEl = document.createElement("p")
		var newText = document.createTextNode(msg)
		newEl.appendChild(newText)
		myNode.appendChild(newEl)
	}
}

function switchLetter(letter, code, decrypt){
	var alpha = decrypt==false ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "ZYXWVUTSRQPONMLKJIHGFEDCBA"
	var changed = false
	if (letter == letter.toLowerCase()){
		letter = letter.toUpperCase()
		changed = true
	}
	var index = alpha.indexOf(letter)
	if (index == -1){
		return letter
	}
	var beta = alpha.slice(code, alpha.length).concat(alpha.slice(0,code))
	var changedLetter = beta.charAt(index)

	return changed==false ? changedLetter : changedLetter.toLowerCase()
}

var encButton = document.getElementById("enc-btn")
var decButton = document.getElementById("dec-btn")

function decipher(decrypt=false){
	document.getElementById("new-msg-field").value = ""
	var input = document.getElementById("input-field").value
	var shift = document.getElementById("select").value
	var cipher = new Cipher(input, shift, decrypt)
	var response = cipher.encrypt()
}

encButton.addEventListener('click', function(){
	decipher()
})
decButton.addEventListener('click', function(){
	decipher(true)
})
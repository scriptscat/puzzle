module.exports = {
	stage: 6,
	next: 'tampermonkey',
	html() {
		return `
    <div class="puzzle">
        <p>这下累了吧,休息一小时吧</p>
    </div>
    <div class="passwd">
		<p>剩余时间:<span id="t">3600</span></p>
    </div>
    `}, js() {
		return `
			let t=3600;
			setInterval(()=>{
				t--;
				document.querySelector('#t').innerText=t;
				if(!t){
					window.location.href="${this.next_page}"
				}
			},1000);
		`;
	}
}
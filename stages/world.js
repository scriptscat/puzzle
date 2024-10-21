
module.exports = {
    stage: 4,
    next: 'scriptcat',
    passwd: '',
    html() {
        return `
    <div class="puzzle">
        <p>输累了,那就让你直接过好了</p>
    </div>
    <div class="passwd">
        <iframe name="iframe" src="stages/world.html" style="border:0">
        </iframe>
    </div>
    `},
    js() {
        return `
            iframe.document.querySelector('#btn').addEventListener('click',()=>{
                window.location.href="${this.next_page}"
            });
        `
    },
}
module.exports = {
  stage: 22,
  next: "font-two",
  passwd: "加密通信",
  html() {
    let ret = `
			  <div class="puzzle">
				<p class="OpenTypeSans">歪比巴卜</p>
			</div>
				<div class="passwd">
				<input type="text" name="passwd" id="passwd"/>
				<input type="submit" name="Submit" value="确认密码">
			  </div>
			  `;
    return ret;
  },
  css() {
    return `
	@font-face {
		font-family: 'OpenTypeSans';
		src: url('../fonts/stage-22.otf') format('opentype');
	}
	
	.OpenTypeSans {
		font-family: "OpenTypeSans" !important;
		speak: none;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		line-height: 1;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	`;
  },
};

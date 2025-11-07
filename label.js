!function(){let e="hiagent-bubble-container",t="hiagent-bubble",i="hiagent-bubble-image",n="hiagent-bubble-tooltip",o="hiagent-bubble-tooltip-text",a="hiagent-bubble-tooltip-arrow",r="hiagent-conversation",s="hiagent-conversation-iframe",l=`
.${e} {
  position: relative;
}

.${t} {
  position: fixed;
  bottom: 100px;
  right: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #e0e0e0 60%, #cccccc 100%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), inset -10px -10px 20px rgba(255, 255, 255, 0.6), inset 10px 10px 20px rgba(0, 0, 0, 0.1);
}

.${t} .${n} {
  display: flex;
  align-items: center;
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  padding-right: 8px;
  border-radius: 6px;
  white-space: nowrap;
  line-height: 20px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.${t}:hover .${n} {
  opacity: 1;
  pointer-events: auto;
}

.${t} .${n} .${o} {
  max-width: 140px;
  background: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.${t} .${n} .${a} {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #333;
}

.${i} {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: none;
}

.${r} {
  width: 70%;
  min-width: 700px;
  height: min(600px, 70vh);
  position: fixed;
  right: 15px;
  bottom: 210px;
  border-radius: 12px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.03), 0px 15px 35px -2px rgba(0, 0, 0, 0.05)
}

.${s} {
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
`;window.HiagentWebSDK={...window.HiagentWebSDK,WebLiteClient:class{appKey="";baseUrl="";container=void 0;agentDetail=void 0;errorMessage="";isRenderConversation=!1;isConversationRendered=!1;isMouseInTooltip=!1;constructor(e){this.appKey=e.appKey,this.baseUrl=e.baseUrl;try{this.initStyles(),this.renderBubble(),this.fetchAgentConfig()}catch(e){this.renderTooltip(e.message)}}checkUrlPermission=e=>0===e.length||e.includes(window.location.origin);initStyles(){let e=document.createElement("style");e.textContent=l,document.head.appendChild(e)}renderBubble(){let bubbleContainer=document.createElement("div");bubbleContainer.className="hiagent-bubble-container";let bubble=document.createElement("div");bubble.className="hiagent-bubble";let bubbleImage=document.createElement("img");bubbleImage.className="hiagent-bubble-image";let tooltip=document.createElement("div");tooltip.className="hiagent-bubble-tooltip";let tooltipText=document.createElement("span");tooltipText.className="hiagent-bubble-tooltip-text";let tooltipArrow=document.createElement("span");tooltipArrow.className="hiagent-bubble-tooltip-arrow";let conversation=document.createElement("div");conversation.className="hiagent-conversation";let iframe=document.createElement("iframe");iframe.className="hiagent-conversation-iframe";iframe.allow="microphone;autoplay";conversation.appendChild(iframe),tooltip.append(tooltipText,tooltipArrow),bubble.append(bubbleImage,tooltip),bubbleContainer.append(bubble,conversation),document.body.appendChild(bubbleContainer)}async fetchAgentConfig(){try{let e=await fetch(`${this.baseUrl}/api/proxy/websdk/get_websdk_config`,{method:"POST",mode:"cors",body:JSON.stringify({AppKey:this.appKey}),headers:{"Content-Type":"application/json"}}),t=await e.json();t?.AppName?(this.agentDetail=t,this.handleAppDetailResponse()):this.renderTooltip(t?.ResponseMetadata?.Error?.Message||t?.message||"\u672A\u77E5\u9519\u8BEF")}catch(e){this.renderTooltip(e.message)}}updateBubbleImage(e){let t=document.querySelector(`.${i}`);t.src=`${this.baseUrl}/api/proxy/down?Action=Download&Version=2022-01-01&Path=${encodeURIComponent(e)}&IsAnonymous=true`,t.style.display="inline-block"}handleAppDetailResponse(){let{WebSdkConfig:e,AppImage:t,AppName:i}=this.agentDetail;this.checkUrlPermission(e?.WebSiteList||[])?(this.renderTooltip(i),this.updateBubbleImage(t),this.setupBubbleInteractions()):this.renderTooltip("\u5F53\u524D\u57DF\u540D\u65E0\u8BBF\u95EE\u6743\u9650")}setupBubbleInteractions(){document.querySelector(`.${t}`).addEventListener("click",this.handleBubbleClick)}handleBubbleClick=()=>{if(!this.isRenderConversation)return this.renderConversationFrame();this.hideConversationFrame()};handleBodyClick=t=>{t.target.closest(`.${e}`)||this.hideConversationFrame()};renderConversationFrame(){this.isConversationRendered||(document.querySelector(`.${s}`).src=`${this.baseUrl}/product/llm/chat/${this.appKey}?embed=true`,document.body.addEventListener("click",this.handleBodyClick));let e=document.querySelector(`.${r}`);e.style.opacity="1",e.style.pointerEvents="auto",this.isConversationRendered=!0,this.isRenderConversation=!0}hideConversationFrame(){let e=document.querySelector(`.${r}`);e.style.opacity="0",e.style.pointerEvents="none",this.isRenderConversation=!1}renderTooltip(e){let t=document.querySelector(`.${o}`);t.textContent=e,t.title=e,t.style.display="inline-block"}}}}();
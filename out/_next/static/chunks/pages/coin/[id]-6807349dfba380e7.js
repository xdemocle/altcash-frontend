(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3],{1631:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/coin/[id]",function(){return t(46782)}])},62965:function(e,r,t){"use strict";t.d(r,{A:function(){return i},d:function(){return a}});var i=function(e,r){var t=0;try{t=e*r}catch(i){return NaN}return Number(t)},a=function(e,r){var t=0;try{t=e*r}catch(i){return"n/d"}return String(t.toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,").replace(/^/,"R ")}},84121:function(e,r,t){"use strict";t.d(r,{Z:function(){return p}});var i=t(85893),a=t(16748),n=t(86010),o=t(96486),s=t(25675),c=t.n(s),l=t(98547),m=t(80808),d=t(3447),u=(0,t(59874).Z)((function(){return{avatar:{padding:0,verticalAlign:"middle",overflow:"visible","& svg":{width:"2rem",height:"2rem",padding:0,verticalAlign:"middle",overflow:"visible"}},regular:{width:"2rem",height:"2rem","& svg":{width:"2rem",height:"2rem"}},large:{width:"4rem",height:"4rem","& svg":{width:"4rem",height:"4rem"}}}})),p=function(e){var r=e.coinSymbol,t=e.size,s=u(),p=r.toLowerCase(),h="",x=null,g=(0,a.a)(d.j5,{fetchPolicy:"cache-only"}).data;try{x=(0,m.Rm)(p)}catch(f){p="cc-default",h=function(e){if(!g||!g.metaCoinAll)return"n/d";var r=(0,o.find)(g.metaCoinAll,{symbol:e});return r&&r.logo?r.logo:(0,m.Rm)("btc")}(r.toUpperCase())||"https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png"}return x?(0,i.jsx)(l.Q,{src:x.default.src,className:(0,n.Z)(s.avatar,p,s.regular,"avatar"===t&&s[t],"large"===t&&s[t])}):(0,i.jsx)(c(),{src:h,alt:"Logo ".concat(r),width:"32",height:"32",title:"Logo ".concat(r)})}},46782:function(e,r,t){"use strict";t.r(r),t.d(r,{__N_SSG:function(){return J},default:function(){return $}});var i=t(85893),a=t(16748),n=t(94669),o=t(89008),s=t(83321),c=t(15861),l=t(98456),m=t(78462),d=t(19294),u=t(79953),p=t(55113),h=t(86886),x=t(25675),g=t.n(x),f=t(11163),j=t(67294),Z=t(94803),y=t.n(Z),v=t(62965),b=t(62925),N=t(57786),T=t(66242),R=t(33841),w=t(66586),B=t(87109),C=t(87357),P=t(86010),z=t(90591),S=t(28840),k=t(80808),H=t(96486),L=t(93230),_=function(e){var r=(0,L.Z)().bitcoinRandPrice,t=(0,j.useState)(1),i=t[0],a=t[1];return(0,j.useEffect)((function(){var t=Number((0,v.A)(e.askRate,r));(0,H.isNaN)(t)||a(t)}),[e,r]),{multiplier:i}},A=t(26042),I=t(69396),F=t(99534),E=t(57333),D=function(e){var r=e.inputRef,t=e.onChange,a=e.name,n=(0,F.Z)(e,["inputRef","onChange","name"]);return(0,i.jsx)(E.Z,(0,I.Z)((0,A.Z)({},n),{getInputRef:r,onValueChange:function(e){t({target:{name:a,value:e.value}})},thousandSeparator:!0,isNumericString:!0}))},V=t(14924),W=t(47036),M=t(13486),O=t(59874),X=(0,O.Z)((function(e){var r=e.breakpoints,t=e.typography,i=e.spacing;return{root:{position:"relative",padding:t.pxToRem((0,k.zH)(i(3))),display:"grid"},grid:(0,V.Z)({display:"flex",justifyContent:"space-between",width:"100%",flexDirection:"column"},r.up("md"),{width:"75%",paddingRight:"2.5%",flexDirection:"row"}),gridReverse:(0,V.Z)({flexDirection:"column-reverse",justifyContent:"flex-end"},r.up("md"),{flexDirection:"row-reverse",justifyContent:"flex-end"}),gridItem:(0,V.Z)({paddingRight:0},r.up("md"),{padding:0}),gridTitle:{display:"block",color:W.Z[600],fontSize:".9rem",marginBottom:t.pxToRem((0,k.zH)(i(1)))},symbol:{color:M.Z[700]},boxBuyButtonRoot:(0,V.Z)({display:"flex",alignItems:"end",width:"100%"},r.up("md"),{position:"absolute",bottom:"1.5rem",right:"1.5rem",width:"25%"}),boxBuyLed:{position:"absolute",top:"1.5rem",right:"1.5rem"},buyButtonContainer:(0,V.Z)({marginLeft:0,marginTop:"2.5rem",width:"100%"},r.up("md"),{paddingBottom:"1.45rem",marginLeft:t.pxToRem((0,k.zH)(i(2))),marginTop:0}),buyButton:{minHeight:"3.5rem",width:"100%"},flex:(0,V.Z)({display:"flex",justifyContent:"center",alignItems:"center",marginTop:"0",height:"auto"},r.up("md"),{marginTop:"31px",height:"56px"}),arrow:{cursor:"pointer",width:"2rem !important",height:"2rem !important"},arrowMobile:{margin:"1.5rem 0 1rem 0",width:"3rem !important",height:"3rem !important"},innerCard:{transition:"all 300ms !important",overflow:"hidden",height:"0",width:"95%",margin:"0 auto",marginTop:"-0.1rem",textAlign:"right"},innerCardOpen:{height:"9rem"},innerCardRoot:{padding:"1rem"}}})),q=function(e){var r=e.coin,t=e.ticker,a=X(),n=(0,j.useState)("green"),o=n[0],l=n[1],m=(0,j.useState)(!1),d=m[0],u=m[1],p=(0,j.useState)(0),x=p[0],g=p[1],f=(0,j.useState)(0),Z=f[0],y=f[1],v=(0,j.useState)(0),H=v[0],L=v[1],A=_(t).multiplier,I=(0,z.NL)((0,k.j2)(x)),F=function(e){console.debug(e)},E=function(e){console.debug("closed",e)},V=function(){u(!d)};return(0,j.useEffect)((function(){l("yellow"),setTimeout((function(){return l("green")}),3e3)}),[A]),(0,j.useEffect)((function(){d||L(Z/A),g(Z+S.Xv/100*Z+S.ZL/100*Z)}),[d,Z,A]),(0,j.useEffect)((function(){d&&Z!==H/A&&y(H*A)}),[d,H,A]),(0,i.jsxs)("form",{noValidate:!0,autoComplete:"off",method:"POST",onSubmit:function(e){e.preventDefault(),Z>r.minTradeSize*A+S.m7&&I(F,E)},children:[(0,i.jsxs)(T.Z,{className:a.root,children:[(0,i.jsxs)("div",{className:(0,P.Z)(a.grid,d?a.gridReverse:""),children:[(0,i.jsxs)(h.ZP,{item:!0,xs:12,md:4,className:a.gridItem,sx:{minWidth:"45%"},children:[(0,i.jsxs)(R.Z,{htmlFor:"gridLeftInput",className:a.gridTitle,children:["You pay in ",(0,i.jsx)("strong",{children:"Rand (ZAR)"})]}),(0,i.jsx)(w.Z,{id:"gridLeftInput",name:"localCurrency",fullWidth:!0,helperText:"Min: R ".concat((r&&r.minTradeSize?r.minTradeSize*A+S.m7:0).toFixed(2)),variant:"outlined",inputProps:{maxLength:"25",min:r.minTradeSize*A},InputProps:{inputComponent:D,startAdornment:(0,i.jsx)(B.Z,{position:"start",children:"R"})},value:Z,onChange:function(e){return y(Number(e.target.value))},disabled:d})]}),(0,i.jsx)(h.ZP,{item:!0,xs:12,md:1,className:a.gridItem,sx:{minWidth:"10%"},children:(0,i.jsxs)("div",{className:a.flex,children:[(0,i.jsx)(C.Z,{sx:{display:{xs:"none",md:"block"}},children:(0,i.jsx)(b.Z,{color:"primary",className:a.arrow,onClick:V})}),(0,i.jsx)(C.Z,{sx:{display:{xs:"block",md:"none"}},children:(0,i.jsx)(N.Z,{color:"primary",className:(0,P.Z)(a.arrow,a.arrowMobile),onClick:V})})]})}),(0,i.jsxs)(h.ZP,{item:!0,xs:12,md:4,className:a.gridItem,sx:{minWidth:"45%"},children:[(0,i.jsxs)(R.Z,{htmlFor:"gridRightInput",className:a.gridTitle,children:["You get ",(0,i.jsx)("strong",{className:a.symbol,children:r.name})]}),(0,i.jsx)(w.Z,{id:"gridRightInput",name:"cryptoCurrency",fullWidth:!0,helperText:"Min: ".concat((r&&r.minTradeSize?r.minTradeSize:0).toFixed(2)," ").concat(r.symbol),variant:"outlined",inputProps:{maxLength:"25",min:r.minTradeSize},InputProps:{inputComponent:D,endAdornment:(0,i.jsx)(B.Z,{position:"start",children:r.symbol||""})},value:H,onChange:function(e){return L(Number(e.target.value))},disabled:!d})]})]}),(0,i.jsx)(C.Z,{className:a.boxBuyButtonRoot,children:(0,i.jsx)("div",{className:a.buyButtonContainer,children:(0,i.jsx)(s.Z,{variant:"contained",color:"primary",type:"submit",className:a.buyButton,disabled:H<=r.minTradeSize,children:"Buy Now"})})}),(0,i.jsx)(C.Z,{className:a.boxBuyLed,children:(0,i.jsx)("div",{className:"led-".concat(o)})})]}),(0,i.jsx)(T.Z,{className:(0,P.Z)(a.innerCard,Z>r.minTradeSize*A+S.m7&&a.innerCardOpen),children:(0,i.jsxs)("div",{className:a.innerCardRoot,children:[(0,i.jsxs)(c.Z,{variant:"h6",sx:{borderBottom:"0.1rem solid",marginTop:"0.2rem",paddingTop:"0.2rem",paddingBottom:"0.2rem",marginBottom:"0.5rem",textTransform:"uppercase"},color:"primary",children:["(Total buy) R ",x.toFixed(2)," ="]}),"(amount selected) R ",Z," +",(0,i.jsx)("br",{}),"(payment fee) R"," ",(S.Xv/100*Z).toFixed(2)," +",(0,i.jsx)("br",{}),"(altcash fee) R ",(S.ZL/100*Z).toFixed(2)," ","+",(0,i.jsx)("br",{})]})})]})},G=t(84121),Q=function(e){var r=e.url,t=e.br;return(0,i.jsxs)(j.Fragment,{children:[(0,i.jsx)("a",{href:r,rel:"noopener noreferrer",target:"_blank",children:r}),t&&(0,i.jsx)("br",{})]})},U=t(3447),Y=(0,O.Z)((function(e){var r=e.breakpoints,t=e.palette,i=e.spacing,a=e.typography;return{root:(0,V.Z)({paddingTop:a.pxToRem((0,k.zH)(i(2))),marginLeft:a.pxToRem((0,k.zH)(i(2))),paddingBottom:a.pxToRem((0,k.zH)(i(2))),marginRight:a.pxToRem((0,k.zH)(i(2)))},r.up("sm"),{paddingTop:a.pxToRem((0,k.zH)(i(2))),marginLeft:a.pxToRem((0,k.zH)(i(5))),paddingBottom:a.pxToRem((0,k.zH)(i(5))),marginRight:a.pxToRem((0,k.zH)(i(5)))}),inner:{position:"relative",maxWidth:"64rem"},title:{lineHeight:"3rem"},pageAvatar:{position:"absolute",top:0,right:0},infoParagraph:{margin:"1rem 0",fontWeight:500},dataParagraph:{marginBottom:"2.5rem"},column:{flexBasis:0},progress:{color:M.Z[500]},backButton:{marginBottom:a.pxToRem((0,k.zH)(i(1)))},boxBuy:{marginBottom:a.pxToRem((0,k.zH)(i(5)))},card:{padding:a.pxToRem((0,k.zH)(i(2))),marginBottom:a.pxToRem((0,k.zH)(i(3)))},links:{marginBottom:a.pxToRem((0,k.zH)(i(3)))},paper:{padding:a.pxToRem((0,k.zH)(i(2))),margin:a.pxToRem((0,k.zH)(i(1))),marginBottom:a.pxToRem((0,k.zH)(i(2))),lineHeight:a.pxToRem((0,k.zH)(i(3))),color:t.text.secondary}}})),J=!0,$=function(){var e=Y(),r=(0,f.useRouter)(),t=r.query.id,x=String(t).toUpperCase(),Z=(0,a.a)(U.Rd,{fetchPolicy:"cache-and-network",variables:{id:x}}),b=Z.data,N=Z.loading,T=(0,a.a)(U.VJ,{fetchPolicy:"cache-first",variables:{id:x}}).data,R=(0,a.a)(U.rj,{fetchPolicy:"cache-first",variables:{pair:"XBTZAR"}}).data,w=b?b.coin:{},B=b?b.summary:{quoteVolume:0,volume:0},C=b?b.ticker:{},P=T?T.metaCoin:{},z=R?Number(R.pair.last_trade):1;return(0,i.jsxs)("div",{className:e.root,children:[(0,i.jsx)(o.Z,{title:"Go back to coin list",children:(0,i.jsx)(s.Z,{color:"primary",size:"large","aria-label":"Find a coin",onClick:function(){r.push("/buy")},startIcon:(0,i.jsx)(n.Z,{}),className:e.backButton,children:"Back"})}),(0,i.jsxs)("div",{className:e.inner,children:[(0,i.jsx)(c.Z,{color:"primary",variant:"h4",gutterBottom:!0,className:e.title,children:w.name||x}),(0,i.jsxs)("div",{className:e.pageAvatar,children:[N&&(0,i.jsx)(l.Z,{className:e.progress,size:"4rem"}),!N&&!P.description&&(0,i.jsx)(G.Z,{coinSymbol:x||""}),!N&&P.logo&&(0,i.jsx)(g(),{src:P.logo,width:"64",height:"64",alt:P.logo,title:P.name})]}),(0,i.jsx)(c.Z,{variant:"h6",gutterBottom:!0,className:e.infoParagraph,children:"Buy now"}),(0,i.jsx)("div",{className:e.boxBuy,children:(0,i.jsx)(q,{coin:w,ticker:C})}),(0,i.jsx)(c.Z,{variant:"h6",gutterBottom:!0,className:e.infoParagraph,children:"Market Details & Statistics"}),(0,i.jsxs)(m.Z,{className:e.dataParagraph,"aria-label":"Coin Data",children:[(0,i.jsxs)(d.ZP,{divider:!0,children:[(0,i.jsx)(u.Z,{primary:(0,i.jsx)("strong",{children:"Current Buy Price"}),className:e.column}),(0,i.jsx)(u.Z,{primary:"".concat((0,v.d)(C.bidRate,z)),secondary:"".concat(C.bidRate," BTC"),className:e.column})]}),(0,i.jsxs)(d.ZP,{divider:!0,children:[(0,i.jsx)(u.Z,{primary:"Last Trade Price",className:e.column}),(0,i.jsx)(u.Z,{primary:"".concat((0,v.d)(C.lastTradeRate,z)),secondary:"".concat(C.lastTradeRate," BTC"),className:e.column})]}),(0,i.jsxs)(d.ZP,{divider:!0,children:[(0,i.jsx)(u.Z,{primary:"Price Change",className:e.column}),(0,i.jsx)(u.Z,{primary:"".concat(B.percentChange,"%"),secondary:"Last 24hrs",className:e.column})]}),(0,i.jsxs)(d.ZP,{divider:!0,children:[(0,i.jsx)(u.Z,{primary:"Price at Highest",className:e.column}),(0,i.jsx)(u.Z,{primary:"".concat((0,v.d)(B.high,z)),secondary:"".concat(B.high," BTC"),className:e.column})]}),(0,i.jsxs)(d.ZP,{divider:!0,children:[(0,i.jsx)(u.Z,{primary:"Price at Lowest",className:e.column}),(0,i.jsx)(u.Z,{primary:"".concat((0,v.d)(B.low,z)),secondary:"".concat(B.low," BTC"),className:e.column})]}),(0,i.jsxs)(d.ZP,{divider:!0,children:[(0,i.jsx)(u.Z,{primary:"Trading Volume",className:e.column}),(0,i.jsx)(u.Z,{primary:"".concat(B.volume.toFixed(2)," ").concat(w.symbol),secondary:"of ".concat(w.name),className:e.column})]}),(0,i.jsxs)(d.ZP,{divider:!0,children:[(0,i.jsx)(u.Z,{primary:"Quote Volume",className:e.column}),(0,i.jsx)(u.Z,{primary:"".concat((0,v.d)(B.quoteVolume,z)),secondary:"".concat(B.quoteVolume.toFixed(2)," BTC"),className:e.column})]}),(0,i.jsxs)(d.ZP,{divider:!0,children:[(0,i.jsx)(u.Z,{primary:"Last update",className:e.column}),(0,i.jsx)(u.Z,{primary:(0,i.jsx)(y(),{children:B.updatedAt}),secondary:"Page data refresh automatically",className:e.column})]})]}),T&&P.description&&(0,i.jsxs)(j.Fragment,{children:[(0,i.jsx)(c.Z,{variant:"h6",gutterBottom:!0,className:e.infoParagraph,children:"Description"}),(0,i.jsx)(p.Z,{className:e.card,children:(0,i.jsx)(c.Z,{variant:"body1",children:P.description})})]}),T&&P.urls&&(0,i.jsxs)("div",{className:e.links,children:[(0,i.jsx)(c.Z,{variant:"h6",gutterBottom:!0,className:e.infoParagraph,children:"Links"}),(0,i.jsxs)(h.ZP,{container:!0,children:[!!P.urls.website.length&&(0,i.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsxs)(p.Z,{className:e.paper,children:[(0,i.jsx)("strong",{children:"Website:"}),(0,i.jsx)("br",{}),P.urls.website.map((function(e){return(0,i.jsx)(Q,{url:e,br:!0},e)}))]})}),!!P.urls.twitter.length&&(0,i.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsxs)(p.Z,{className:e.paper,children:[(0,i.jsx)("strong",{children:"Social Media:"}),(0,i.jsx)("br",{}),P.urls.twitter.map((function(e){return(0,i.jsx)(Q,{url:e,br:!0},e)}))]})}),!!P.urls.chat.length&&(0,i.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,i.jsxs)(p.Z,{className:e.paper,children:[(0,i.jsx)("strong",{children:"Chat:"}),(0,i.jsx)("br",{}),P.urls.chat.map((function(e){return(0,i.jsx)(Q,{url:e,br:!0},e)}))]})})]})]})]})]})}}},function(e){e.O(0,[662,885,242,318,774,888,179],(function(){return r=1631,e(e.s=r);var r}));var r=e.O();_N_E=r}]);
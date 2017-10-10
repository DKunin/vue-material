webpackJsonp([34],{811:function(e,t,d){var a=d(1)(null,d(894),null,null,null);e.exports=a.exports},894:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,d=e._self._c||t;return d("page-content",{attrs:{"page-title":"Components - Onboarding"}},[d("docs-component",[d("div",{attrs:{slot:"description"},slot:"description"},[d("p",[e._v("The onboarding offers a first and fast look for your page, with custom controls, automatized steps and swipe effects. Can be also used as a custom carousel.")]),e._v(" "),d("p",[e._v("Can be themed used the following:")]),e._v(" "),d("ul",{staticClass:"md-body-4"},[d("li",[d("code",[e._v("md-primary")])]),e._v(" "),d("li",[d("code",[e._v("md-warn")])]),e._v(" "),d("li",[d("code",[e._v("md-accent")])]),e._v(" "),d("li",[d("code",[e._v("md-transparent")])])])]),e._v(" "),d("div",{attrs:{slot:"api"},slot:"api"},[d("api-table",{attrs:{name:"md-onboarding"}},[d("md-table",{attrs:{slot:"properties"},slot:"properties"},[d("md-table-header",[d("md-table-row",[d("md-table-head",[e._v("Name")]),e._v(" "),d("md-table-head",[e._v("Type")]),e._v(" "),d("md-table-head",[e._v("Description")])],1)],1),e._v(" "),d("md-table-body",[d("md-table-row",[d("md-table-cell",[e._v("md-auto")]),e._v(" "),d("md-table-cell",[d("code",[e._v("Boolean")])]),e._v(" "),d("md-table-cell",[e._v("Enable auto-slider. "),d("br"),e._v("Default: "),d("code",[e._v("false")])])],1),e._v(" "),d("md-table-row",[d("md-table-cell",[e._v("md-infinite")]),e._v(" "),d("md-table-cell",[d("code",[e._v("Boolean")])]),e._v(" "),d("md-table-cell",[e._v("Enable infinite loop. "),d("br"),e._v("Default: "),d("code",[e._v("false")])])],1),e._v(" "),d("md-table-row",[d("md-table-cell",[e._v("md-duration")]),e._v(" "),d("md-table-cell",[d("code",[e._v("Number")])]),e._v(" "),d("md-table-cell",[e._v("Set duration for "),d("code",[e._v("md-auto")]),e._v(" in milliseconds. "),d("br"),e._v("Default: "),d("code",[e._v("5000")])])],1),e._v(" "),d("md-table-row",[d("md-table-cell",[e._v("md-controls")]),e._v(" "),d("md-table-cell",[d("code",[e._v("Boolean")])]),e._v(" "),d("md-table-cell",[e._v("Enable prev/next controls. "),d("br"),e._v("Default: "),d("code",[e._v("false")])])],1),e._v(" "),d("md-table-row",[d("md-table-cell",[e._v("md-swipeable")]),e._v(" "),d("md-table-cell",[d("code",[e._v("Boolean")])]),e._v(" "),d("md-table-cell",[e._v("Enable the swipe functionality. "),d("br"),e._v("Default: "),d("code",[e._v("false")])])],1),e._v(" "),d("md-table-row",[d("md-table-cell",[e._v("md-swipe-distance")]),e._v(" "),d("md-table-cell",[d("code",[e._v("Number")])]),e._v(" "),d("md-table-cell",[e._v("Set the swipe distance needed to open/close the sidenav. "),d("br"),e._v("Default: "),d("code",[e._v("100")])])],1)],1)],1)],1)],1),e._v(" "),d("div",{attrs:{slot:"example"},slot:"example"},[d("example-box",{attrs:{"card-title":"Basic, automatic, infinite, uncontrolled, swipeable"}},[d("div",{attrs:{slot:"demo"},slot:"demo"},[d("md-boards",{attrs:{"md-auto":!0,"md-infinite":!0,"md-duration":5e3,"md-swipeable":!0}},[d("md-board",{attrs:{id:"slide1"}},[d("p",[e._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.")])]),e._v(" "),d("md-board",{attrs:{id:"slide2"}},[d("p",[e._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.")])]),e._v(" "),d("md-board",{attrs:{id:"slide3"}},[d("p",[e._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.")])])],1)],1),e._v(" "),d("div",{attrs:{slot:"code"},slot:"code"},[d("code-block",{attrs:{lang:"xml"}},[e._v('\n            <md-boards :md-auto="true" :md-infinite="true" :md-duration="5000" :md-swipeable="true">\n              <md-board id="slide1">\n                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>\n              </md-board>\n\n              <md-board id="slide2">\n                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>\n              </md-board>\n\n              <md-board id="slide3">\n                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>\n              </md-board>\n            </md-boards>\n          ')])],1)]),e._v(" "),d("example-box",{attrs:{"card-title":"Themed, finite, controlled"}},[d("div",{attrs:{slot:"demo"},slot:"demo"},[d("md-boards",{staticClass:"md-transparent",staticStyle:{"background-color":"black"},attrs:{"md-controls":!0}},[d("md-board",{staticStyle:{color:"white"},attrs:{id:"slide1"}},[d("p",[e._v("Transparent themed, for background-imaged slides. Background color black added for demonstration purposes.")])]),e._v(" "),d("md-board",{staticStyle:{color:"white"},attrs:{id:"slide2"}},[d("p",[e._v("Transparent themed, for background-imaged slides. Background color black added for demonstration purposes.")])]),e._v(" "),d("md-board",{staticStyle:{color:"white"},attrs:{id:"slide3"}},[d("p",[e._v("Transparent themed, for background-imaged slides. Background color black added for demonstration purposes.")])])],1),e._v(" "),d("md-boards",{staticClass:"md-primary",attrs:{"md-controls":!0}},[d("md-board",{attrs:{id:"slide1"}},[d("p",[e._v("Primary themed")])]),e._v(" "),d("md-board",{attrs:{id:"slide2"}},[d("p",[e._v("Primary themed")])])],1),e._v(" "),d("md-boards",{staticClass:"md-accent",attrs:{"md-controls":!0}},[d("md-board",{attrs:{id:"slide1"}},[d("p",[e._v("Accent themed")])]),e._v(" "),d("md-board",{attrs:{id:"slide2"}},[d("p",[e._v("Accent themed")])]),e._v(" "),d("md-board",{attrs:{id:"slide3"}},[d("p",[e._v("Accent themed")])])],1),e._v(" "),d("md-boards",{staticClass:"md-warn",attrs:{"md-controls":!0}},[d("md-board",{attrs:{id:"slide1"}},[d("p",[e._v("Warn themed")])]),e._v(" "),d("md-board",{attrs:{id:"slide2"}},[d("p",[e._v("Warn themed")])]),e._v(" "),d("md-board",{attrs:{id:"slide3"}},[d("p",[e._v("Warn themed")])]),e._v(" "),d("md-board",{attrs:{id:"slide4"}},[d("p",[e._v("Warn themed")])])],1)],1),e._v(" "),d("div",{attrs:{slot:"code"},slot:"code"},[d("code-block",{attrs:{lang:"xml"}},[e._v('\n            <md-boards class="md-transparent" :md-controls="true">\n              <md-board id="slide1">\n                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>\n              </md-board>\n            </md-boards>\n\n            <md-boards class="md-primary" :md-controls="true">\n              <md-board id="slide1">\n                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>\n              </md-board>\n            </md-boards>\n\n            <md-boards class="md-accent" :md-controls="true">\n              <md-board id="slide1">\n                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>\n              </md-board>\n            </md-boards>\n\n            <md-boards class="md-warn" :md-controls="true">\n              <md-board id="slide1">\n                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>\n              </md-board>\n            </md-boards>\n          ')])],1)])],1)])],1)},staticRenderFns:[]}}});
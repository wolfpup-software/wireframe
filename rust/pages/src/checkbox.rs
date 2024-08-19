use coyote::Component::None;
use coyote::{attr_val, tmpl, text, Component};

use crate::document::document_frame;
use crate::catalog::{design_system_bar, css as dt_css};

// read file to string
// make a css bundler
fn css() -> Component {
    text(
        "
        label:has(input[type=checkbox]) {
            cursor: pointer;
        }

        input[type=checkbox] {
            appearance: none;
            position: relative;
            vertical-align: text-bottom;
            display: inline-block;
            box-sizing: border-box;
            block-size: 1rem;
            inline-size: 1rem;
            background: transparent;
            border: 1px solid black;
            cursor: pointer;
        }

        input[type=checkbox]::before {
            content: '';
            display: block;
            box-sizing: border-box;
            margin-block-start: calc(0.25rem - 1px);
            margin-inline-start: calc(0.25rem - 1px);
            block-size: 0.5rem;
            inline-size: 0.5rem;
            outline: 1px solid black;
            background: transparent;
        }

        input[type=checkbox]:checked::before {
            background: black;
        }
        "
    )
}

// build something to import this via css files
fn styles() -> Component {
    tmpl("
        <style>{}</style>
        <style>{}</style>
        ", 
        [dt_css(), css()],
    )
}

fn component_token_bar() -> Component {
    tmpl(
        "
        <form>
			<label><input type=number></input>block-size</label>
		</form>
        ",
        [],
    )
}

fn body() -> Component {
    tmpl(
        "
        <header></header>
        <main>
            {}
            {}
            <section>
			    <label><input type=checkbox>checkbox</input></label>
            </section>
        </main>   
        <footer></footer>
        ",
        [design_system_bar(), component_token_bar()]
    )
}

pub fn page() -> Component {
    document_frame(
        attr_val("lang", "en-us"),
        None,   // meta
        styles(),   // styles
        None,   // scripts
        body(), // body
    )
}

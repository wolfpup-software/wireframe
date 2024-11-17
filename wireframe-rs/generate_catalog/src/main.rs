use config;
use futures::future::try_join_all;
use std::env;
use std::path::PathBuf;
use tokio::fs;

use tokio::fs::File;
use tokio::io::AsyncWriteExt;

use coyote::attr_val;
use coyote::Component;
use coyote_html::{Html, ServerRules};

use pages;

#[tokio::main]
async fn main() {
    let args = match env::args().nth(1) {
        Some(a) => PathBuf::from(a),
        None => return println!("argument error:\nconfig params not found."),
    };
    let config = match config::from_filepath(&args).await {
        Ok(c) => c,
        Err(e) => return println!("config error:\n{}", e),
    };

    // create styles
    // create pages

    // let styles_results = generate_styles();

    let pages_results = generate_pages(&config).await;
}

pub fn lang() -> Component {
    attr_val("lang", "en-us")
}

async fn create_page(name: &str) -> Option<Component> {
    let page = match name {
        "home" => pages::home::page(),
        _ => return None,
    };

    Some(page)
}

async fn write_page(target_filename: &PathBuf, document: String) -> Result<(), std::io::Error> {
    let mut file = match File::create(target_filename).await {
        Ok(file) => file,
        Err(e) => return Err(e),
    };
    match file.write_all(document.as_bytes()).await {
        Ok(file) => file,
        Err(e) => return Err(e),
    };
    Ok(())
}

async fn generate_pages(config: &config::Config) -> Result<(), std::io::Error> {
    // get state
    // create cached templates
    let curr_dir = match std::env::current_dir() {
        Ok(pb) => pb,
        Err(e) => return Err(e),
    };

    let mut html = Html::new();
    let rules = ServerRules::new();

    for (name, target_filename) in &config.pages {
        let path = curr_dir.join(target_filename);
        let parent_path = match path.parent() {
            Some(p) => p,
            _ => continue, // incorrect but to get past current error;
        };

        let page = match create_page(name).await {
            Some(p) => p,
            _ => continue,
        };

        let document = html.build(&rules, &page);

        // get absolte and check if starts with the targt_filepath
        let _ = fs::create_dir_all(parent_path).await;

        let mut file = match File::create(&path).await {
            Ok(file) => file,
            Err(e) => return Err(e),
        };

        let result = match file.write_all(document.as_bytes()).await {
            Ok(file) => file,
            Err(e) => return Err(e),
        };
    }

    Ok(())
}

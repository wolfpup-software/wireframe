// take a directory

// recursively copy files and directories in target directory
// .css
// .js

use std::path::PathBuf;
use tokio::fs::read_dir;

pub async fn generate_assets(
    source_path: PathBuf,
    dest_path: PathBuf,
    ext: &str,
) -> Result<(), String> {
    // walk through directory
    // add to stack

    let mut dir_stack = Vec::<PathBuf>::new();

    let mut dir_iter = match read_dir(source_path).await {
        Ok(ditr) => ditr,
        Err(e) => return Err(e.to_string()),
    };

    // iterate throuh entries
    // add to dir_stack if directory
    // otherwise copy file to location
    while let Ok(entry_attempt) = dir_iter.next_entry().await {
        if let Some(entry) = entry_attempt {
            let path = entry.path();
            if path.is_dir() {
                dir_stack.push(entry.path().clone());
            }

            if path.is_file() {
                // check extension
                // copy file to location
            }
        }
    }
    
    // keep walking
    Ok(())
}

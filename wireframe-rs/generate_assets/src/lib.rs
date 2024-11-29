// take a directory

// recursively copy files and directories in target directory
// .css
// .js

use std::path;
use std::path::PathBuf;
use tokio::fs::{copy, read_dir};

pub async fn generate_assets(
    source_path: PathBuf,
    dest_path: PathBuf,
    ext: &str,
) -> Result<(), String> {
    let abs_path = match path::absolute(&source_path) {
        Ok(p) => p,
        Err(e) => return Err(e.to_string()),
    };

    let mut dir_stack = Vec::<PathBuf>::from([abs_path]);

    // while paths to parse is not 0 length
    while dir_stack.len() != 0 {
        let mut curr_stack = dir_stack;
        dir_stack = Vec::<PathBuf>::new();

        // iterate across queued paths
        for dir_path in curr_stack {
            // get absolute path
            let abs_dir = match path::absolute(&dir_path) {
                Ok(p) => p,
                Err(e) => return Err(e.to_string()),
            };

            if abs_dir.is_file() {
                return Err("found a file in dir stack".to_string());
            }

            let mut dir_iter = match read_dir(abs_dir).await {
                Ok(ditr) => ditr,
                Err(e) => return Err(e.to_string()),
            };

            while let Ok(entry_attempt) = dir_iter.next_entry().await {
                if let Some(entry) = entry_attempt {
                    let entry_path = dir_path.join(entry.path());
                    if entry_path.is_dir() {
                        dir_stack.push(entry_path.clone());
                    }

                    if entry_path.is_file() {
                        // check extension
                        // copy file to location

                        // difference between source path and current path
                        // then add difference to target_path
                    }
                }
            }
        }
    }

    // keep walking
    Ok(())
}

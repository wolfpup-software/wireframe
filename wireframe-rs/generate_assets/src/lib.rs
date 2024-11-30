// take a directory

// recursively copy files and directories in target directory
// .css
// .js

use std::path;
use std::path::PathBuf;
use tokio::fs::{copy, create_dir_all, read_dir};

pub async fn generate_assets(
    source_path: PathBuf,
    dest_path: PathBuf,
    _ext: &str,
) -> Result<(), String> {
    let source_abs = match path::absolute(&source_path) {
        Ok(p) => p,
        Err(e) => return Err(e.to_string()),
    };

    if source_abs.is_file() {
        return Err("found a file in dir stack".to_string());
    }

    let dest_abs = match path::absolute(&dest_path) {
        Ok(p) => p,
        Err(e) => return Err(e.to_string()),
    };

    if dest_abs.is_file() {
        return Err("found a file in dir stack".to_string());
    }

    let mut source_stack = Vec::<PathBuf>::from([source_abs]);
    let mut dest_stack = Vec::<PathBuf>::from([dest_abs]);

    // while paths to parse is not 0 length
    while source_stack.len() != 0 {
        let curr_source_stack = source_stack;
        source_stack = Vec::<PathBuf>::new();

        let curr_dest_stack = dest_stack;
        dest_stack = Vec::<PathBuf>::new();

        // iterate across queued paths

        let mut curr_itr = curr_source_stack.iter();
        let mut dest_itr = curr_dest_stack.iter();

        // while iterating across paths
        while let (Some(src_path), Some(dst_path)) = (curr_itr.next(), dest_itr.next()) {
            let mut dir_iter = match read_dir(&src_path).await {
                Ok(ditr) => ditr,
                Err(e) => return Err(e.to_string()),
            };

            while let Ok(entry_attempt) = dir_iter.next_entry().await {
                if let Some(entry) = entry_attempt {
                    let source_entry = src_path.join(entry.path());
                    let dest_entry = dst_path.join(entry.path());

                    if source_entry.is_dir() {
                        if let Err(e) = create_dir_all(&dest_entry).await {
                            return Err(e.to_string());
                        }

                        source_stack.push(source_entry.clone());
                        dest_stack.push(dest_entry.clone());
                    }

                    if source_entry.is_file() {
                        // check extension
                        // copy file to location

                        let _ = copy(source_entry, dest_entry).await;
                    }
                }
            }
        }
    }

    // keep walking
    Ok(())
}

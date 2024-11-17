// take a directory

// recursively copy files and directories in target directory
// .css
// .js

use std::path::Path;
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

    while let Ok(entry_attempt) = dir_iter.next_entry().await {
        if let Some(entry) = entry_attempt {
            println!("{:?}", entry.path());

			let path = entry.path();

            if path.is_dir() {
                dir_stack.push(entry.path().clone());
            }

			if path.is_file() {
				// check extension
				// copy file to location
			}
            // is file?
            // check if file has the correct extension
            // copy file to destination file

            // is directory? add directory to directory queue
        }
    }
    // keep walking
    Ok(())
}

use std::{
    env,
    fs,
    iter::FromIterator,
};

#[derive(Debug)]
pub struct Input(pub Vec<String>);

impl Input {
    pub fn new(day: u8) -> Self {
        let path = Self::get_path(day);
        let input_as_string = fs::read_to_string(path).expect("Unable to read input file");

        input_as_string.split("\n").map(|line| String::from(line)).collect()
    }
    
    fn empty() -> Self {
        Input(Vec::new())
    }

    fn add(&mut self, item: String) {
        self.0.push(item);
    }
    
    fn get_path(day: u8) -> String {
        let current_dir = env::current_dir().expect("Error reading current directory");
        let base_dir = current_dir.parent()
            .unwrap()
            .to_str()
            .unwrap();

        format!("{}/input/{}.txt", base_dir, day)
    }
}

impl FromIterator<String> for Input {
     fn from_iter<I: IntoIterator<Item=String>>(iter: I) -> Self {
        let mut input = Input::empty();

        for i in iter {
            input.add(i);
        }

        input 
    }
}

impl IntoIterator for Input {
    type Item = String;
    type IntoIter = std::vec::IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.0.into_iter()
    }
}

pub fn multiply(numbers: Vec<usize>) -> usize {
    match numbers.split_first() {
        Some((head, tail)) => head * multiply(Vec::from(tail)),
        None => 1
    }
}
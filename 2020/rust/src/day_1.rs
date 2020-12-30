use crate::common::{Input,multiply};

fn format_input(input: Input) -> Vec<usize> {
    input.into_iter()
        .map(|line| line.parse().expect("Cannot convert line to u8"))
        .collect()
}

fn find_matches(list: &Vec<usize>, target: usize) -> Option<Vec<usize>> {
    let (head, tail) = list.split_first()?;

    let potential_match = target - head;

    match tail.contains(&potential_match) {
        true => Some(Vec::from([*head, potential_match])),
        false => find_matches(&Vec::from(tail), target),
    }
}

fn a(input: &Vec<usize>, target: usize) -> Option<usize> {
    let matches = find_matches(input, target)?;

    Some(multiply(matches))
}

fn b(input: &Vec<usize>, target: usize) -> Option<usize> {
    let mut matches: Vec<usize> = vec!();

    let input_iterator = input.into_iter();

    input_iterator.clone().for_each(|date| {
        input_iterator.clone().for_each(|second_date| {
            let rest = date + second_date;

            if rest < target && input.contains(&(target - rest)) {
                matches = vec!(*date, *second_date, rest);
            }
        })
    });

    match matches.len() == 3 {
        true => Some(multiply(matches)),
        false => None
    } 
}

pub fn exec() {
    const DAY: u8 = 1;
    const TARGET: usize = 2020;

    let input = format_input(Input::new(DAY));

    let res_a = a(&input, TARGET).expect("No match found");
    println!("Exercise A : {}", res_a);

    let res_b = b(&input, TARGET).expect("No match found");
    println!("Exercise B : {}", res_b);
}
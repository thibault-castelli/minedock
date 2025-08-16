const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const booleanToString = (value: boolean) => (value ? 'Yes' : 'No');

export { capitalizeFirstLetter, booleanToString };

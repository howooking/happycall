export default function ageCalculator(birth = "2000") {
  return new Date().getFullYear() - birth.slice(0, 4);
}

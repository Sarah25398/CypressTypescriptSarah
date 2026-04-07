const year: number = 2026;
const goals = {
  heal: "Become fit and healthy",
  learn: "Learn a new skill or hobby",
  travel: "Explore new places and cultures",
  connect: "Build stronger relationships with family and friends",
  give: "Give back to the community through volunteering or charity work",
  career: "Advance in my career or find a new job that I am passionate about",
  salary: "Increase my salary or find a new job that pays better",
  education:
    "Pursue further education or certifications to enhance my knowledge and skills",
  personalGrowth:
    "Focus on personal growth and self-improvement through reading, meditation, or therapy",
  financial:
    "Improve my financial situation by saving more, investing wisely, or paying off debt",
};
function logMyGoals(year: number, goals: Record<string, string>): void {
  console.log(`My goals for the year ${year} are:`);
  for (const [key, value] of Object.entries(goals)) {
    console.log(`${key}: ${value}`);
  }
}
logMyGoals(year, goals);

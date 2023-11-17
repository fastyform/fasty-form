import { redirect } from 'next/navigation';

// TODO: it doesnt work propely it should be handled in middleware
// Main page '/' should redirect to submissions and other pages should redirect to 404 maybe
const NotFound = () => redirect('/submissions');

export default NotFound;

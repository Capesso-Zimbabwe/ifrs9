import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full h-full max-h-full max-w-full overflow-x-hidden">
      <Sidebar />
      <TopBar />
      <main className="flex-1 mt-15 flex flex-col pl-56 w-full h-full max-h-full max-w-full overflow-x-hidden scrollbar-hide">
       
        {children}
      </main>
    </div>
  );
};

// Add custom CSS class for hiding scrollbar
const styles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;            /* Chrome, Safari and Opera */
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Layout; 
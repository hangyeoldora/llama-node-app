const Index = () => {
  return (
    <footer className='footer'>
      <button className='footer-content'>
        <div className='footer-content-child'></div>
        <div className='chatgpt-mar-14-container'>
          <a
            className='chatgpt-mar-14-version'
            href='https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
            target='_blank'
          >
            <span className='chatgpt-mar-14'>ChatGPT Mar 14 Version</span>{' '}
          </a>
          . Free Research Preview. | GPT 4 Version Redesign by Jenish Dhanani
        </div>
      </button>
    </footer>
  );
};

export default Index;

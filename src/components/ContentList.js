import React from 'react';
import { useSelector } from 'react-redux';

const ContentList = () => {
  const contents = useSelector((state) => state.content.contents);

  return (
    <div className="content-list">
      {contents.map((content) => (
        <div className="content-item" key={content.title}>
          <h3>{content.title}</h3>
          <p>{content.description}</p>
          {content.media_type === 'video' ? (
            <iframe src={content.media_url} title={content.title}></iframe>
          ) : (
            <a href={content.media_url} target="_blank" rel="noopener noreferrer">
              View {content.media_type}
            </a>
          )}
          <p>Category: {content.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ContentList;

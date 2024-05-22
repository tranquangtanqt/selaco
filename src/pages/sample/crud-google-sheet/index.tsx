import AxiosClient from 'api/axios-client';
import { useState, useRef } from 'react';

export const SampleCRUDGoogleSheet = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const scriptUrl =
    'https://script.google.com/macros/s/AKfycbxDj3LXDytTlKsK6XDRmite7ffZkP-Lc0SZNo05Y8zuRgkVfBoMDy5cm4FQDmWD7T-iOg/exec';

  const sheetUrl =
    'https://docs.google.com/spreadsheets/d/1BGNLMd5AoaXK26OXKxOvDvjJer8jOizucG41FkIWMQQ/edit#gid=0';

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (formRef.current) {
      const response = await AxiosClient.post(
        scriptUrl,
        new FormData(formRef.current),
      );
      console.log(response);

      if (response.status === 200) {
        console.log('SUCCESSFULLY SUBMITTED');
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <form ref={formRef} onSubmit={handleSubmit} name="google-sheet">
        <div className="input-style">
          <input
            type="hidden"
            name="sheetUrl"
            value={sheetUrl}
            placeholder="Your Name *"
          />
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name *" />
        </div>
        <div className="input-style">
          <label htmlFor="name">Email</label>
          <input type="email" name="email" placeholder="Your Email *" />
        </div>
        <div className="input-style">
          <label htmlFor="name">Phone No</label>
          <input type="number" name="phone" placeholder="Your Phone *" />
        </div>
        <div className="input-style">
          <input
            type="submit"
            value={loading ? 'Loading...' : 'SEND MESSAGE'}
          />
        </div>
      </form>
    </div>
  );
};

const TextBox = () => {
  /**
   * Sign in/upフォームのテキストボックス
   */
  return <>
    <div className="form-control w-full">
      <input
        type="text"
        placeholder=" Email"
        className="input input-bordered w-full rounded-full border-none bg-[#EEF3F9] placeholder:text-xl"
      />
      <label className="label">
        <span className="label-text-alt">*invalid email</span>
      </label>
    </div>
  </>
}

export default TextBox
using System;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Tesseract;

namespace FileUploadAngular5WithAsp.NetCore.Controllers
{
	[Produces("application/json")]
	public class StoryFilesController : Controller
	{
		private IWebHostEnvironment _hostingEnvironment;

		public StoryFilesController(IWebHostEnvironment hostingEnvironment)
		{
			_hostingEnvironment = hostingEnvironment;
		}

		[HttpPost("api/story/files"), DisableRequestSizeLimit]
		public ActionResult UploadFile()
		{
			try
			{
				const string folderName = "Upload";
				var result = string.Empty;
				var file = Request.Form.Files[0];
				var webRootPath = _hostingEnvironment.WebRootPath;
				var newPath = Path.Combine(webRootPath, folderName);

				if (!Directory.Exists(newPath))
				{
					Directory.CreateDirectory(newPath);
				}

				if (file.Length > 0)
				{
					var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
					var fullPath = Path.Combine(newPath, fileName);
					using var stream = new FileStream(fullPath, FileMode.Create);
					file.CopyTo(stream);

					using var engine = new TesseractEngine(Path.Combine(webRootPath, "tessdata"), "eng", EngineMode.Default);
					using var img = Pix.LoadFromFile(fullPath);
					var page = engine.Process(img);
					result = page.GetText();
				}

				return Json(result);
			}
			catch (IOException ex)
			{
				return Json("Upload Failed: " + ex.Message);
			}
		}

	}
}
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Nautilus.Data;
using Tesseract;

namespace FileUploadAngular5WithAsp.NetCore.Controllers
{
	[Produces("application/json")]
	public class StoryFilesController : Controller
	{
		private IWebHostEnvironment _hostingEnvironment;

		public StoryFilesController(ApplicationDbContext context, IWebHostEnvironment hostingEnvironment)
		{
			_hostingEnvironment = hostingEnvironment;
		}

		[HttpPost("api/story/{storyId:int}/files"), DisableRequestSizeLimit]
		public ActionResult UploadFile(int storyId)
		{
			var result = new List<object>();
			var folderName = $"Upload/{storyId}";
			foreach (var file in Request.Form.Files)
			{
				var webRootPath = _hostingEnvironment.WebRootPath;
				var newPath = Path.Combine(webRootPath, folderName);

				if (file.Length == 0)
				{
					throw new ArgumentOutOfRangeException("File is empty");
				}

				if (!Directory.Exists(newPath))
				{
					Directory.CreateDirectory(newPath);
				}

				var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
				var fullPath = Path.Combine(newPath, fileName);
				using var stream = new FileStream(fullPath, FileMode.Create);
				file.CopyTo(stream);

				using var engine = new TesseractEngine(Path.Combine(webRootPath, "tessdata"), "eng", EngineMode.Default);
				using var img = Pix.LoadFromFile(fullPath);
				var page = engine.Process(img);

				result.Add(new { text = page.GetText(), file = $"{folderName}/{file.FileName}" });
			}

			return Json(result);
		}
	}
}
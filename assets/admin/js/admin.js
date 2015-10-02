(function ($) {
	"use strict";

	$(function () {

		/**
		 * Mark as read
		 */
		$('.wpas-mark-read').on('click', function (event) {
			event.preventDefault();

			var btn = $(this),
				replyID = $(this).data('replyid'),
				data = {
					'action': 'wpas_mark_reply_read',
					'reply_id': replyID
				};

			$.post(ajaxurl, data, function (response) {

				/* check if response is an integer */
				if (Math.floor(response) == response && $.isNumeric(response)) {
					btn.fadeOut('fast');
					$('#wpas-unread-' + replyID).fadeOut('fast');
				} else {
					alert(response);
				}

			});

		});

		/**
		 * System Status
		 */
		var table, tableID, tableData, tables = [];

		$('.wpas-system-status-table').each(function (index, el) {
			tableID = $(el).attr('id').replace('wpas-system-status-', '');
			tableData = $(el).tableToJSON();
			table = tableData;
			tables.push({
				label: tableID,
				data: tableData
			});
		});

		$('#wpas-system-status-generate-json').click(function (event) {
			/* Populate the textarea and select all its content */
			/* http://stackoverflow.com/a/5797700 */
			$('#wpas-system-status-output').html(JSON.stringify(tables)).fadeIn('fast').focus().select();
		});

		$('#wpas-system-status-generate-wporg').click(function (event) {
			/* Populate the textarea and select all its content */
			/* http://stackoverflow.com/a/5797700 */
			$('#wpas-system-status-output').html('`' + JSON.stringify(tables) + '`').fadeIn('fast').focus().select();
		});

		/**
		 * Check if editor is empty
		 */
		$('.wpas-reply-actions').on('click', 'button', function () {

			var textarea = $('textarea[name="wpas_reply"]');

			// Detect Visual and Text Mode in WordPress TinyMCE Editor
			var is_tinymce_active = (typeof tinyMCE != "undefined") && editor && !editor.isHidden();

			// Visual Editor
			if (is_tinymce_active) {
				var editor = tinyMCE.activeEditor;
				var editorContent = editor.getContent();
				if (editorContent === '' || editorContent === null) {

					/* Highlight the active editor */
					$(editor.getBody()).css('background-color', '#ffeeee');

					/* Alert the user */
					alert(wpasL10n.alertNoContent);
					$(editor.getBody()).css('background-color', '');

					/* Focus on editor */
					editor.focus();

					return false;
				}

			}

			// Text Editor
			else {
				if (!textarea.val()) {

					/* Alert the user */
					alert(wpasL10n.alertNoContent);

					/* Focus on editor */
					textarea.focus();

					return false;
				}
			}
		});

		/**
		 * jQuery Select2
		 * http://select2.github.io/select2/
		 */
		if (jQuery().select2 && $('select.wpas-select2').length) {
			$('select.wpas-select2:visible').select2();
		}

	});

}(jQuery));